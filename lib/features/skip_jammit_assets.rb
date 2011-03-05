module Middleman::Features::SkipJammitAssets
  class << self

    def registered(app)
      require 'middleman/builder'
      Middleman::Builder.send(:define_method, :after_generation) do

        Jammit.packager.individual_urls(:site, :js).each do |asset|
          File.delete(File.join(destination_root, asset)) unless asset =~ /\.#{Jammit.template_extension}$/
        end

        # remove empty dirs
        Dir[File.join(destination_root, Middleman::Server.js_dir, '**', '*')].select { |d|
          File.directory? d
        }.sort.reverse.each do |d|
          Dir.rmdir(d) if Dir.entries(d).size ==  2
        end

      end
    end

  end
end
