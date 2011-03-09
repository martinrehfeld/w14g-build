require 'rubygems'
require 'bundler/setup'
require 'fileutils'
require 'coffee-script'

namespace :js do
  desc "compile coffee-scripts from ./app to ./public/javascripts/app"
  task :compile do
    source = File.join(File.dirname(__FILE__), 'app')
    javascripts = File.join(File.dirname(__FILE__), 'public/javascripts/app')

    Dir[File.join(source, '**/*.coffee')].each do |cf|
      unless %w(. .. templates).include?(cf)
        puts "Compiling #{cf}..."
        js = CoffeeScript.compile File.read(cf)
        target = cf.sub(/^#{source}/, javascripts).sub(/.coffee$/, '.js')
        FileUtils.mkdir_p File.dirname(target)
        open target, 'w' do |f|
          f.puts js
        end
      end
    end
  end
end

desc "Clean ./build directory"
task :clean do
  sh 'rm -rf ./build/*'
end

desc "Build the site"
task :build => [:clean, :'js:compile'] do
  sh 'mm-build'
  sh 'rm -rf ./public/javascripts/app'
end
