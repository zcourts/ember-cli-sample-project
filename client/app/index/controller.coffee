`import Ember from 'ember'`

IndexController = Ember.Controller.extend
  gender:
    [
      {id: 1, label: 'Male', value: 'M'},
      {id: 2, label: 'Female', value: 'F'}
    ]

  actions:
    register: ->
      console.log @gender, 'Registered'
    login: ->
      console.log "Logged in"

`export default IndexController`
