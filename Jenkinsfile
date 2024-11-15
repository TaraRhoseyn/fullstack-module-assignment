pipeline {
    agent {
        docker {
            image 'node:18'
            reuseNode true
            // args '--network=host'
            args '-p 3000:3000 -p 3001:3001 --link mysql-container:mysql'
        }
    }

    services {
        mysql {
            image 'mysql:latest'
            environment {
                MYSQL_ROOT_PASSWORD = 'root'
                MYSQL_DATABASE = 'furniturezz'
                MYSQL_USER = 'root'
                MYSQL_PASSWORD = ''
            }
            ports = ['3306:3306']
        }
    }

    stages {
        stage('Check Environment') {
            steps {
                // Check Node.js and npm versions
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies for the Express server
                sh '''
                    cd server 
                    npm install --verbose
                '''
                // Install dependencies for the React client
                sh '''
                    cd client
                    npm install --verbose
                '''
            }
        }

        stage('Start Express server') {
            steps {
                sh '''
                    cd server
                    npm start
                '''
            }
        }

        stage('Start React server') {
            steps {
                sh '''
                    cd client
                    export PORT=3001
                    npm start
                '''
            }
        }
    }
}
