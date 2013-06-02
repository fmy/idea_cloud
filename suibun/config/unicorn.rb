env = ENV["RAILS_ENV"] || "development"
worker_processes Integer(ENV["WEB_CONCURRENCY"] || 4)
timeout 15
listen "/home/ubuntu/idea_cloud/suibun/tmp/sockets/suibun.socket", :backlog => 64
preload_app true
pid "/home/ubuntu/idea_cloud/suibun/tmp/unicorn.pid"

# Production specific settings
if env == "production"
  working_directory "/home/ubuntu/idea_cloud/suibun"
 
  user 'ubuntu', 'ubuntu'
  shared_path = "/home/ubuntu/idea_cloud/suibun"
 
  stderr_path "#{shared_path}/log/unicorn.stderr.log"
  stdout_path "#{shared_path}/log/unicorn.stdout.log"
end

before_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn master intercepting TERM and sending myself QUIT instead'
    Process.kill 'QUIT', Process.pid
  end

  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection.disconnect!
  end
end 

