pipeline {
    agent {
        docker {
            image 'node:18'
            reuseNode true
            // args '--network=host'
            args '-p 3000:3000 -p 3001:3001 --link mysql-container:mysql'
        }
    }

    // services {
    //     mysql {
    //         image 'mysql:latest'
    //         environment {
    //             MYSQL_ROOT_PASSWORD = 'root'
    //             MYSQL_DATABASE = 'furniturezz'
    //             MYSQL_USER = 'root'
    //             MYSQL_PASSWORD = ''
    //         }
    //         ports = ['3306:3306']
    //     }
    // }

    environment {
        MYSQL_ROOT_PASSWORD = 'root'
        MYSQL_DATABASE = 'furniturezz'
        MYSQL_USER = 'root'
        MYSQL_PASSWORD = ''
    }

    stages {

        stage('Start MySQL Container') {
            steps {
                script {
                    sh '''
                        docker run -d --name mysql-container \
                        -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
                        -e MYSQL_DATABASE=$MYSQL_DATABASE \
                        -e MYSQL_USER=$MYSQL_USER \
                        -e MYSQL_PASSWORD=$MYSQL_PASSWORD \
                        -p 3306:3306 \
                        mysql:latest
                    '''
                    // Wait for MySQL to be ready
                    sh 'sleep 20'
                }
            }
        }

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
