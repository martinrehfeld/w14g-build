require "bundler"
Bundler.setup

require 'coffee-script'
require 'jammit'

Jammit.load_configuration(File.join(File.dirname(__FILE__), 'assets.yml'))
Jammit.packager.precache_all(File.join('.', 'build', 'javascripts'), '.') if ENV['MM_ENV'] == 'build'

module Middleman::Features
  autoload :SkipJammitAssets, "lib/features/skip_jammit_assets"
end

configure :build do
  activate :minify_css
  activate :cache_buster
  activate :relative_assets
  activate :skip_jammit_assets
end

::Compass::configuration.asset_cache_buster = :none
set :haml, { :attr_wrapper => '"', :format => :html5 }

require File.join(Dir.getwd, 'lib', 'jammit_helper')
helpers do
  include JammitHelper

  def compress_javascript(javascript)
    compressor = ::YUI::JavaScriptCompressor.new(:munge => true)
    compressor.compress(javascript)
  end
end

# deliver application templates via Jammit
template_ext = Jammit.template_extension.to_sym
get "/javascripts/site.#{template_ext}" do
  content_type :js
  Jammit.packager.pack_templates(:site)
end

# compile CoffeeScript sources on the fly
get '/javascripts/app/*' do |js_file|
  content_type :js
  source = File.join(File.dirname(__FILE__), 'app', js_file.sub(/.js$/, '.coffee'))
  CoffeeScript.compile File.read(source)
end
