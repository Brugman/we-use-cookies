function wuc_set_cookie( name, value, days )
{
    var d = new Date();
    d.setTime( d.getTime()+( days*24*60*60*1000 ) );
    var expires = 'expires='+d.toUTCString();
    document.cookie = name+'='+value+'; '+expires+'; path=/; SameSite=Lax;';
}

function wuc_accept_cookies()
{
    wuc_set_cookie( 'i_accept_cookies', 1, 365 );
    document.getElementById( 'we-use-cookies' ).remove();
    return false;
}