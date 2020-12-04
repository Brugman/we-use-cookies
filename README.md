# We Use Cookies

> WordPress cookie notice plugin for developers.

Let's be honest. Is your website really going to get audited? With this plugin you've got *something* and no extra headaches.

:heavy_check_mark: Tiny.\
:heavy_check_mark: Configure with hooks.\
:heavy_check_mark: No added backend menus.\
:heavy_check_mark: No added database crap.

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

### Change the position & size

Positioning: `top`, `bottom`, `left`, `center`, `right`.\
Size: `wide`.

```php
add_filter( 'wuc_classes', function ( $classes ) {
    return 'top right wide';
});
```

### Disable the default CSS

```php
add_filter( 'wuc_css', '__return_false' );
```

## FAQ

### Does this plugin make my site GDPR compliant?

I don't know. Ask your legal advisor.

## Contributing

Found a bug? Anything you would like to ask, add or change? Please open an issue so we can talk about it.

Pull requests are welcome on the develop branch. Please try to match the current code formatting.

## Author

[Tim Brugman](https://github.com/Brugman)