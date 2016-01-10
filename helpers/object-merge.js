module.exports = function (obj1, obj2) {
	if (!obj2)
		obj2 = {};
    for (var name in obj2)
        if (obj2.hasOwnProperty(name))
            obj1[name] = obj2[name];
};
