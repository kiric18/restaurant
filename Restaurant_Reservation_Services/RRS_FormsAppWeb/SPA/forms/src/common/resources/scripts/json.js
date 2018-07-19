
export class Json {

    clone(object) {
        return JSON.parse(JSON.stringify(object));
    }

    // Call this function.
    // The others are helpers for this one.
    getDiff(a, b) {
        var diff = (this.isArray(a) ? [] : {});
        this.recursiveDiff(a, b, diff);
        return diff;
    }

    recursiveDiff(a, b, node) {
        var checked = [];

        for (var prop in a) {
            if (typeof a[prop] == 'undefined') {
                continue;
            }

            if (typeof b[prop] == 'undefined') {
                //this.addNode(prop, '[[removed]]', node);
            }
            else if (JSON.stringify(a[prop]) != JSON.stringify(b[prop])) {
                // if value
                if (typeof b[prop] != 'object' || b[prop] == null) {
                    this.addNode(prop, b[prop], node);
                }
                else {
                    //// if array
                    //if(this.isArray(b[prop])){
                    //    this.addNode(prop, [], node);
                    //    this.recursiveDiff(a[prop], b[prop], node[prop]);
                    //}
                    //// if object
                    //else {
                    //    this.addNode(prop, {}, node);
                    //    this.recursiveDiff(a[prop], b[prop], node[prop]);
                    //}

                    // NEW - save object array as stringified JSON
                    this.addNode(prop, JSON.stringify(b[prop]), node);
                }
            }
        }
    }

    addNode(prop, value, parent) {
        parent[prop] = value;
    }

    isArray(obj) {
        return (Object.prototype.toString.call(obj) === '[object Array]');
    }
}