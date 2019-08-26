const config = require('./config');                         // Configuration settings
const path = require('path');                               // Path library used for building file locations
const fileSave = require('file-save');                      // Utility for writing files to disk
const webpack = require('webpack');			     // Webpack library
const VueLoaderPlugin = require('vue-loader/lib/plugin');   // Plugin used for loading single-component vue files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

var postcssPlugins = [ 
	require('postcss-preset-env'),
	autoprefixer({})
]
if(process.env.NODE_ENV == 'production') postcssPlugins.push(require('cssnano'));

// Output the application settings file
if (config.appSettings != null) {
    // NOTE: the replace regex on the next line removes the quotes from properties.  It is rudimentary and can be removed 
    // if it causes issues (because the quotes are technically OK I just think they look bad).
    var appSettingsOutput = JSON.stringify(config.appSettings, null, 4);
    fileSave(path.join(path.resolve(__dirname, "../../web/scripts"), "app-settings.js"))
        .write("window.appSettings = " + appSettingsOutput);
}
const webpathConfig = {
    mode: config.webpackMode,   // Specifies whether to use built-in optimizations accordingly (options: production | development | none)
    entry: { // Specifies the entry point of the application where webpack begins the packaging process.  
		main: [
			'./App_Src/main.js',
			'@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
		]
	},
    output: {
        path: path.resolve(__dirname, "../../web/scripts"),  // Specifies the output directory for any wepback output files
        filename: '[name].js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'  // This is required to avoid the error 'You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.'
        },
		extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this necessary.
						'scss': [
							'vue-style-loader',
							{ loader: 'css-loader',
								options: {
									sourceMap: process.env.NODE_ENV !== 'production'
								}
							},
							{ loader: 'postcss-loader', 
								options: {
									ident: 'postcss',
									plugins: postcssPlugins,
									sourceMap: process.env.NODE_ENV !== 'production'
								}
							},
							{ loader: 'sass-loader',
								options: {
									sourceMap: process.env.NODE_ENV !== 'production'
								}
							}
						],
						'vue': {
							loader: 'babel-loader',
							exclude: /node_modules/,
							options: {
								presets: ['@babel/preset-env']
							}
						},
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-env']
				}

			},
            {
				test: /\.css$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: {
							sourceMap: process.env.NODE_ENV !== 'production'
						}
					},
					{ loader: 'postcss-loader', options: {
							ident: 'postcss',
							plugins: postcssPlugins,
							sourceMap: process.env.NODE_ENV !== 'production'
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: {
							sourceMap: process.env.NODE_ENV !== 'production'
						}
					},
					{ loader: 'postcss-loader', options: {
							ident: 'postcss',
							plugins: postcssPlugins,
							sourceMap: process.env.NODE_ENV !== 'production'
						}
					},
					{ loader: 'sass-loader', options: {
							sourceMap: process.env.NODE_ENV !== 'production'
						}
					}
				]
			},
            // ESLint rules
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, "App")],
                options: {
                    eslintPath: path.join(__dirname, '../node_modules/eslint'),
                    fix: true,
                    emitError: false,
                    emitWarning: false,
                    failOnError: true,
                    failOnWarning: false
                }
            }
        ]
	},
	optimization: {
		/* splitChunks: {
			chunks: 'all'
		} */	
	},
    plugins: [
		  new MiniCssExtractPlugin({
			  filename: "../css/[name].css",
			  chunkFilename: "[id].css"
		  }),
		  ////////////////////////////////////////////////////////////////////////////////////////////
        // Required per manual configuration section of the Vue Loader configuration instructions 
        // located at https://vue-loader.vuejs.org/guide/#vue-cli
        ////////////////////////////////////////////////////////////////////////////////////////////
        new VueLoaderPlugin(),

		new webpack.ProvidePlugin({
			mapboxgl: 'mapbox-gl'
		}),

		new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
            'appSettings': "window.appSettings"
        }),
    ],
    watch: config.watch,                // Flag indicating whether webpack should monitor files and update bundles automatically with any changes
    watchOptions: {                     // Specifies watch options for the watching mechanism.
        ignored: ['node_modules']       // Specifies directories to ignore (optimization).
    }
};
module.exports = webpathConfig;