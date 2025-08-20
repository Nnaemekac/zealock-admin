import { modalHide } from '@richaadgigi/stylexui';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const LogoutModal = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeModal = () => {
    modalHide("logout-modal");
  };

  return (
    <section className='xui-modal' xui-modal={'logout-modal'} disable-click-on-outside={'true'}>
      <div className='xui-modal-content xui-bdr-rad-half'>
        <div className='xui-text-center'>
          <p className='xui-font-sz-115 xui-opacity-8 xui-mt-1 xui-mx-auto xui-lg-w-fluid-70'>
            Are you sure you want to logout?
          </p>
        </div>
        <div className='xui-d-grid xui-grid-gap-1 xui-grid-col-1 xui-lg-grid-col-2 xui-mt-2'>
          <button 
            className='xui-btn xui-btn-block xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-bg-light' 
            onClick={closeModal}
          >
            Cancel
          </button>
          <button 
            className='xui-btn xui-btn-block xui-bg-[#2DAD02] xui-text-white xui-bdr-rad-half'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogoutModal;