function UserLogout() {
    
    localStorage.removeItem('userLoginStatus');
    localStorage.removeItem('loginStatus');
    window.location.href = 'user-login';
    
    return (
        <div>
            
        </div>
    );
}

export default UserLogout;