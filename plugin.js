"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapperCallName = "__wrapper";
function default_plugin(babel) {
    var t = babel.types;
    return {
        visitor: {
            CallExpression: {
                enter: function (path, state) {
                    isInsideAsyncFunction(t, path);
                    if (!wrapperIsAlreadyAdded(t, path) && isInsideAsyncFunction(t, path)) {
                        console.log("ADDING WRAPPER");
                        var addedWrapper = addWrapper(t, path);
                        path.replaceWith(addedWrapper);
                    }
                }
            },
        }
    };
}
exports.default = default_plugin;
;
/**
 * checks if the wrapper is already added
 * @param t typeof types
 * @param path NodePath
 * @returns boolean
 */
function wrapperIsAlreadyAdded(t, path) {
    if (path.type === "CallExpression" && path.get('callee') && path.get('callee').node && path.get('callee').node.name === wrapperCallName) { 
        return true;
    }
    if (path.parentPath.type === "AwaitExpression") {
        if (path.parentPath.parentPath && path.parentPath.parentPath.type === "ArrowFunctionExpression" && path.parentPath.parentPath.parentPath && path.parentPath.parentPath.parentPath.type === "CallExpression") {
            if (path.parentPath.parentPath.parentPath.get('callee').node && path.parentPath.parentPath.parentPath.get('callee').node.name && path.parentPath.parentPath.parentPath.get('callee').node.name === wrapperCallName) {
                return true;
            }
        }
    }
    if (path.parentPath.type === "ArrowFunctionExpression") {
        if (path.parentPath.parentPath && path.parentPath.parentPath.type === "CallExpression") {
            if (path.parentPath.parentPath.get('callee').node && path.parentPath.parentPath.get('callee').node.name && path.parentPath.parentPath.get('callee').node.name === wrapperCallName) {
                return true;
            }
        }
    }
    return false;
}
/**
 * adds a wrapper to a path
 * @param t typeof types
 * @param path NodePath
 */
function addWrapper(t, path) {
    if(path.node.callee!=null && path.node.callee.name!=null){
        console.log(">>>> Adding wrapper to element named: "+path.node.callee.name);
    }
    return t.callExpression(t.identifier(wrapperCallName), [
        t.arrowFunctionExpression([], 
        path.node, true)
    ]);
}
function isInsideAsyncFunction(t, path) {
    if (path != undefined && path != null) {
        if (t.isFunction(path.node)) { 
            
            if (!!path.node && !!path.node.async && path.node.async == true) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return isInsideAsyncFunction(t, path.parentPath);
        }
    }
    else {
        return false;
    }
}
