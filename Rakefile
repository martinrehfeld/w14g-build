require 'rubygems'
require 'bundler/setup'
require 'coffee-script'

namespace :js do
  desc "compile coffee-scripts from ./app to ./public/javascripts/app"
  task :compile do
    source = File.join(File.dirname(__FILE__), 'app')
    javascripts = File.join(File.dirname(__FILE__), 'public/javascripts/app')

    Dir[File.join(source, '**.coffee')].each do |cf|
      unless %w(. .. templates).include?(cf)
        js = CoffeeScript.compile File.read(cf)
        open cf.sub(/^#{source}/, javascripts).sub(/.coffee$/, '.js'), 'w' do |f|
          f.puts js
        end
      end
    end
  end
end

desc "Build the site"
task :build => :'js:compile' do
  sh 'rm -rf build/* && mm-build'
end
