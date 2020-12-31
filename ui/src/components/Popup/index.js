import React from 'react';  
import './style.css';  
import Button from '../Button';
import axios from 'axios';
class Popup extends React.Component {  
  state={
    email : '',
    amount: '',
  }

  handleChange = (e) => {
    console.log(e.target.name)
    this.setState({ [e.target.name] : e.target.value })
  }

  handleSubmit = () => {
    if(this.state.email && this.state.amount){
      axios.post('https://admin-pinpoint.herokuapp.com/api/addDonors', {email: this.state.email, amount: this.state.amount})
      .then((data) => {
        this.setState({email: ''})
        this.props.closePopup()
        alert('تم الإضافة بنجاح')
      })
    }else {
      alert('لو سمحت أدخل قيم صحيحة')
    }
  }
  render() {
    const modelClass = this.props.withAmount ? 'popup_model_withAmount' : 'popup_model';
return (  
  <div className='popup'>  
    <div className={modelClass}>  
      <h1>{this.props.text}</h1>  
      <button onClick={this.props.closePopup} className="popup__btn__close">
        <span className="popup__close">&nbsp;</span>
        </button> 
      <div className="popup__form">
      <label className="popup__form__label">
        أدخل إيميلك ليتم التواصل معك 
        <input type="email" className="popup__email" name="email" placeholder="أدخل الإيميل ..." onChange={this.handleChange}/>
      </label>
      {this.props.withAmount && (
              <label className="popup__form__label">
              أدخل المبلغ بالدولار 
                <input type="text" className="popup__email" name="amount" placeholder="أدخل مبلغ التبرع ..." onChange={this.handleChange}/>
              </label>
      )}
      <Button className="popup_form_btn" onClick={this.handleSubmit}>
      تسجيل
      </Button>
      </div>
    </div>  
  </div>  
);  
}  
}  

export default Popup;