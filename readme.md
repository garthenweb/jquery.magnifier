# jquery.magnifier

Simple jQuery plugin for showing details of a big image.

## Usage
Please be sure that this plugin is in early stage and may contain bugs.
``` javascript
$('#magnifier').magnifier({
	height: 300, // height of the created detail box
	width: 300, // width of the created detail box
	detailBackgroundColor: 'transparent', // background color of the created detail box
    detailClassName: 'magnifier-detail', // class name of the detail box
    lensBackground: 'rgba(0,0,0,0.6)',  // background of the overlay
    lensClassName: 'magnifier-lens',  // class name of the overlay
    wrapperClassName: 'magnifier-wrapper' // class name of the wrapper element
});
```

## License

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).