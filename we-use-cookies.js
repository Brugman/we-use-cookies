function wuc_accept() {
    let date = new Date();
    date.setTime( date.getTime() + ( 1000*60*60*24*365 ) );
    document.cookie = 'i_accept_cookies=1; expires='+date.toUTCString()+'; path=/; SameSite=Lax;';

    document.getElementById('wuc').style.display = 'none';
}

if ( document.cookie.indexOf('i_accept_cookies=') === -1 )
    document.getElementById('wuc').style.display = 'block';

