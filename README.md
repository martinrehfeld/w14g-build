# What Was I Thinking?

## Setup / Development

* `mm-server` to run local server in development mode
* `rake build` to package up
* `rake clean` to wipe the build directory

## Directory Structure -- Finding your way around

    app/               CoffeeScript sources for the app

    views/             Pages & Layouts
      stylesheets/     Compass/Sass sources for stylesheets
      index.html.haml  Home page content
      layout.haml      Default layout

    public/            Static assets
      images/          yeah, what you think it is
      javascripts/     "vendored" JS libs

    build              Target dir for packaged build

    assets.yml         Jammit config
    config.rb          Middleman / Sinatra config

## Collaboration

Pivotal Tracker project: https://www.pivotaltracker.com/projects/253927
