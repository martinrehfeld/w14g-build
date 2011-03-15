class App.Views.User extends Backbone.View

  tagName:   'section'
  className: 'user-profile'

  initialize: ->
    @model.bind 'change', @render

  render: =>
    $(@el).html(JST.user_profile model: @model) if @model.get('id')?
    @
