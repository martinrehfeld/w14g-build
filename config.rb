# provide test data from couchdb
require 'open-uri'
require 'rubygems'
require 'json'
get '/tweets' do
  data = JSON.parse(URI.parse('http://localhost:5984/tweets/_design/tweets/_view/per_day?limit=200&include_docs=true&reduce=false').read)
  JSON.generate(data['rows'].map { |row| row['doc'] })
end

# Build-specific configuration
configure :build do
  # Change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Shrink/smush PNG/JPEGs on build
  # activate :smush_pngs

  # Enable cache buster
  activate :cache_buster

  # Generate ugly/obfuscated HTML from Haml
  # activate :ugly_haml

  # Or use a different image path
  # set :http_path, "/Content/images/"
end
