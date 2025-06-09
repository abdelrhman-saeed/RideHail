import { createProxyMiddleware } from "http-proxy-middleware";

export const createServiceProxy = (serviceURL, routePrefix = '') => {

    return createProxyMiddleware({
        target:       serviceURL,
        changeOrigin: true,
        pathRewrite:  (path, req) => path.replace(new RegExp(`^/${routePrefix}\g`, ''))
    })
}
