import dynamoose, { model } from 'dynamoose';

const EntityName = 'User';

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: {
    type: String,
    required: true
  }
  
}, {
  timestamps: true,
  saveUnknown: false
});

export const User_Model = model(EntityName, schema);
