require 'stringio'

module JammitHelper

  def javascripts(*packages)
    packages.map do |pack|
      if ENV['MM_ENV'] == 'build'
        url = asset_url(Jammit.asset_url(pack, :js)[1..-1])
        %Q(<script src="#{url}"></script>\n)
      else
        Jammit.packager.individual_urls(pack.to_sym, :js).map do |file|
          url = file.gsub(%r(^.*build/), asset_url(''))
          %Q(<script src="#{url}"></script>\n)
        end.join
      end
    end.join
  end
  alias include_javascripts javascripts

end

# monkey patch Jammit to additionally look for .coffee files in
# ./app when .js from ./public/javascripts/app was specified
module Jammit
  class Packager

    def glob_files_with_coffee_lookup(glob)
      save_stderr = $stderr
      $stderr = StringIO.new
      paths = glob_files_without_coffee_lookup(glob)
      $stderr = save_stderr

      absolute_glob = Pathname.new(glob).absolute? ? glob : File.join(ASSET_ROOT, glob)

      # add matching CoffeeScript sources to paths
      if absolute_glob =~ /public\/javascripts\/app.*\.js$/
        absolute_glob.sub!(/public\/javascripts\/app/, 'app')
        absolute_glob.sub!(/\.js$/, '.coffee')

        additional_paths = Dir[absolute_glob].sort.map { |path|
          path.sub(/app/, 'public/javascripts/app').sub(/\.coffee$/, '.js')
        }
        paths += additional_paths
      end

      Jammit.warn("No assets match '#{glob}' (not even in ./app/**.coffee)") if paths.empty?
      paths
    end
    alias_method_chain :glob_files, :coffee_lookup

  end
end
