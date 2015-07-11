`import DS from 'ember-data'`
attr = DS.attr;
User = DS.Model.extend
  firstName: attr()
  lastName: attr()
  username: attr()
  password: attr()
  phone: attr()
  email: attr()
  gender: attr()
  dob: attr()

`export default User`
