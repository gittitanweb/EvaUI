<!DOCTYPE html>
<html lang="ru">
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">

        <title>EVA UI</title>

        <link rel="shortcut icon" href="uploads/brand/favicon.png" type="image/x-icon" />

        <!-- Custom styles -->
        <link href="styles/style.less" rel="stylesheet/less" type="text/css" />

    </head>
    <body class="eva">


        <section>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <img src="uploads/demo-1.png" width="100%" />
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="row">
                    <div class="col-12">

                        <table class="responsive-table w-100">
                          <tr>
                            <th>Movie Title</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Gross</th>
                          </tr>
                          <tr>
                            <td data-th="Movie Title">Star Wars</td>
                            <td data-th="Genre">Adventure, Sci-fi</td>
                            <td data-th="Year">1977</td>
                            <td data-th="Gross">$460,935,665</td>
                          </tr>
                          <tr>
                            <td data-th="Movie Title">Howard The Duck</td>
                            <td data-th="Genre">"Comedy"</td>
                            <td data-th="Year">1986</td>
                            <td data-th="Gross">$16,295,774</td>
                          </tr>
                          <tr>
                            <td data-th="Movie Title">American Graffiti</td>
                            <td data-th="Genre">Comedy, Drama</td>
                            <td data-th="Year">1973</td>
                            <td data-th="Gross">$115,000,000</td>
                          </tr>
                        </table>

                    </div>
                </div>
            </div>
        </section>

        <!-- FRAMEWORKS -->
        <script src="/libs/jquery/jquery.js"></script>
        <script src="/libs/tether/tether.min.js"></script>
        <script src="/libs/bootstrap/bootstrap.min.js"></script>

        <!-- BROWSER HELPERS -->
        <!--[if lt IE 9]>
            <script src="/libs/assets/html5shiv.min.js"></script>
            <script src="/libs/assets/respond.min.js"></script>
            <script src="/libs/assets/ie8-responsive-file-warning.js"></script>
        <![endif]-->
        <script src="/libs/assets/ie-emulation-modes-warning.js"></script>
        <script src="/libs/assets/modernizr.custom.83936.opt.js"></script>
        <script src="/libs/assets/ie10-viewport-bug-workaround.js"></script>
        <link  href="/libs/assets/ie10-viewport-bug-workaround.css" type="text/css" />

        <!-- PLUGINS -->
        <script src="/libs/json/jquery.json-2.3.min.js"></script>
        <script src="/libs/cookie/jquery.cookie.js"></script>

        <!-- ALERT -->
        <script src="/libs/sweetalert/sweetalert.js"></script>

        <!-- Шаблонизатор -->
        <script src="/libs/twig/twig-0.8.9.js"></script>

        <!-- LESS -  data-env="development" -  --><script> localStorage.clear(); </script>
        <script src="/libs/less-3.7.1/less.min.js" ></script>

        <!-- EVA UI -->
        <script src="/libs/eva-ui/core.js"></script>
        <script src="/libs/eva-ui/render.js"></script>
        <script src="/libs/eva-ui/helper.js"></script>
        <script src="/libs/eva-ui/events.js"></script>
        <script>
            $(function(){
                $('body').EvaUI_Render({
                    debug : true
                });
            });
        </script>



    </body>
</html>
