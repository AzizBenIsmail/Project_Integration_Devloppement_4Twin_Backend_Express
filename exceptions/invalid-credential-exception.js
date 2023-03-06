const BaseException=require('./base-exception')

class InvalidCreationException extends BaseException{
 constructor(message,status=403){
super(message,status)
 }
}

module.exports=InvalidCreationException