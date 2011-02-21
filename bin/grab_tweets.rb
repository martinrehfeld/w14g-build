#!/usr/bin/env ruby

require 'open-uri'
require 'rubygems'
require 'couchrest'
require 'json'
require 'yaml'

since_id = 39762337623838720  # set to last known tweet

db = CouchRest.new.database!('tweets')

def status_uri(screen_name, options)
  options[:count] ||= 200
  "http://api.twitter.com/1/statuses/user_timeline.json?" +
  "screen_name=#{screen_name}" +
  "#{options.inject('') { |params, option| params << "&#{option.first}=#{option.last}"}}"
end

highest_id = since_id

(1..16).each do |page|
  puts "Processing page #{page}..."

  tweets = JSON.parse(URI.parse(status_uri('roidrage', :include_rts => 1, :include_entities => 1, :count => 200, :page => page)).read)


  tweets.each do |tweet|
    tweet['_id'] = tweet['id_str']
    highest_id = tweet['id'] if tweet['id'] > highest_id
    begin
      db.save_doc(tweet)
    rescue RestClient::Conflict
      # just ignore double entries
      puts "  Tweet #{tweet['_id']} is already present, skipping."
    end
  end
end

puts "The highest ID we grabbed was #{highest_id}"
