# We Use Cookies

> WordPress plugin for a cookie notice without a backend UI.

![screenshot](/screenshot.png)

## Installation

1. Download the ZIP.
1. Extract the folder to `/wp-content/plugins/`.

or

```sh
cd /wp-content/plugins/
git clone https://github.com/Brugman/we-use-cookies.git
```

## Update

1. Download the new ZIP.
1. Replace the old folder in `/wp-content/plugins/`.

or

```sh
cd /wp-content/plugins/we-use-cookies/
git pull
```

## Optional configuration

### Set cookie notice text

```php
add_filter( 'wuc_message', function ( $message ) {
    return 'Hello world.';
});
```

### Activate more info link

```php
add_filter( 'wuc_more_info_page_id', function () {
    return 25;
});
```

### Set position

Valid options are `top` and `bottom` for the y axis, and `left`, `center` and `right` for the x axis.

```php
add_filter( 'wuc_position', function ( $position ) {
    return 'top right';
});
```

## Contributing

Found a bug? Anything you would like to ask, add or change? Please open an issue so we can talk about it.

Pull requests are welcome on the develop branch. Please try to match the current code formatting.

## Author

[Tim Brugman](https://github.com/Brugman)