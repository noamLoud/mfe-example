module.exports = {
    module:{
        rules: [
            {  //babel babel process es6+ to es5 
                test: /\.m?js$/, // let babel process all .mjs/.js files 
                exclude: /node_modules/, //don't let babel process files in node_modules folder
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
}