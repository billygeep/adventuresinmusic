<!DOCTYPE html>  
    <head>
        <title>Front-End Dev Conference</title>
    </head>
    <body>

        @@include('./header.html')

        <h1>{{fullName}}</h1>
        <h2>Tester3</h2>
        <p>{{bio}}</p>
        <p>
            You can find me on <a href="http://www.twitter.com/{{twitterUsername}}">Twitter</a>,
            <a href="http://www.github.com/{{githubUsername}}">GitHub</a> or my <a href="http://{{website}}">Website</a>.
        </p>
    </body>
</html>  