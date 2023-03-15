function AdminLogout() {
    
    localStorage.removeItem('adminLoginStatus');
    localStorage.removeItem('loginStatus');
    window.location.href = 'admin-login';
    
    return (
        <div>
            
        </div>
    );
}

export default AdminLogout;