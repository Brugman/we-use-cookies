# We Use Cookies

```php
add_filter( 'wuc_message', function ( $message ) {
    return 'Hello world.';
});

add_filter( 'wuc_position', function ( $position ) {
    return 'top right';
});

add_filter( 'wuc_more_info_page_id', function () {
    return 25;
});
```