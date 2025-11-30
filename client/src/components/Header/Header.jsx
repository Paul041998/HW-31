import AuthForm from '../AuthForm/AuthForm';
import Menu from '../Menu/Menu';
import './Header.scss';

export default function Header() {
  return (
    <div className='Header'>
      <Menu />
      <AuthForm />
    </div>
  )
}