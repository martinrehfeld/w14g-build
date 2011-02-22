require "bundler"
Bundler.setup

require "jammit"
Jammit.load_configuration(File.join(File.dirname(__FILE__), 'assets.yml'))

configure :build do
  activate :minify_css
  activate :cache_buster
  activate :relative_assets
end

::Compass::configuration.asset_cache_buster = :none
set :haml, { :attr_wrapper => '"', :format => :html5 }

require File.join(Dir.getwd, 'helpers', 'jammit_helper')
helpers do
  include JammitHelper

  def compress_javascript(javascript)
    compressor = ::YUI::JavaScriptCompressor.new(:munge => true)
    compressor.compress(javascript)
  end
end

# deliver application templates via Jammit
template_ext = Jammit.template_extension.to_sym
get "/assets/app.#{template_ext}" do
  Jammit.packager.pack_templates(:app)
end

# provide test data from couchdb
require 'open-uri'
require 'rubygems'
require 'json'
get '/tweets/:index' do |index|
  limit = 200
  data = JSON.parse(URI.parse("http://localhost:5984/tweets/_design/tweets/_view/per_day?descending=false&limit=#{limit}&skip=#{(index.to_i - 1) * limit}&include_docs=true&reduce=false").read)
  JSON.generate(data['rows'].map { |row| row['doc'] })
end
