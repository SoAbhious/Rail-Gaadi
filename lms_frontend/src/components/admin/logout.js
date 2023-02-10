function AdminLogout() {
    
    localStorage.removeItem('adminLoginStatus');
    window.location.href = 'admin-login';
    
    return (
        <div>
            
        </div>
    );
}

export default AdminLogout;