const schema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
    trim:true
  },
  description: {
    type:String,
    
  }
});
export const User = mongoose.model("user_data", schema);