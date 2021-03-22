// check string for keyword
var _CSFKW_ = function(string, cursor, keyword){
	for(var i=0; i<keyword.length;i++){
		if(string[cursor+i] != keyword[i]){
			return false;
		}
	}
	return true;
}

var _NODEHP_ = (_PATH_, data)=>{
	var _FILE_ = require('fs').readFileSync(_PATH_, 'utf8');

	var _OUTPUT_ = "";

	for(var _CURSOR_=0; _CURSOR_<_FILE_.length;_CURSOR_++){
		if(_CSFKW_(_FILE_, _CURSOR_, '<nodehp>')){
			_CURSOR_ += 8;
			var _STRING_ = "";
			while(!_CSFKW_(_FILE_, _CURSOR_, '</nodehp>')){
				_STRING_ += _FILE_[_CURSOR_];
				_CURSOR_ += 1;
			}
			_CURSOR_ += 9;
			var echo = function(_STR_){
				_OUTPUT_ += _STR_;
				return _STR_;
			}

			var include = function(_IPATH_, _IDATA_){
				_OUTPUT_ += _NODEHP_(_IPATH_, _IDATA_);
			}

			var tag = function(_TNAME_, _INL_, _STR_){
				if(_INL_ == null){_INL_ = "";}
				if(_STR_ == null){_STR_ = "";}
				return `<${_TNAME_} ${_INL_}>${_STR_}</${_TNAME_}>`;
			}

			var echoTag = function(_TNAME_, _INL_, _STR_){
				if(_INL_ == null){_INL_ = "";}
				if(_STR_ == null){_STR_ = "";}
				_OUTPUT_ += `<${_TNAME_} ${_INL_}>${_STR_}</${_TNAME_}>`;
			}

			eval(_STRING_);
		}else{
			_OUTPUT_ += _FILE_[_CURSOR_];
		}
	}
	return _OUTPUT_;
}

module.exports = (_PATH_, data)=>{
	return _NODEHP_(_PATH_, data);
};