module.exports = (verbose) => {
	if (!verbose) {
	    console = console || {};
	    console.log = function(){};
	}
}