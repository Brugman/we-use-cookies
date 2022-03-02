function wuc_set_cookie( name, value, days )
{
    let date = new Date();

    date.setTime( date.getTime() + ( days*24*60*60*1000 ) );

    document.cookie = name+'='+value+'; '+'expires='+date.toUTCString()+'; path=/; SameSite=Lax;';
}

function wuc_accept_cookies()
{
    wuc_set_cookie( 'i_accept_cookies', 1, 365 );

    document.getElementById( 'we-use-cookies' ).style.display = 'none';

    return false;
}

function wuc_load()
{
    if ( document.cookie.indexOf('i_accept_cookies=') > -1 )
        return;

    document.getElementById( 'we-use-cookies' ).style.display = 'block';
}

wuc_load();
