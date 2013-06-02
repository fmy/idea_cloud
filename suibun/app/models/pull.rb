class Pull
  def self.pull_and_restart
    system("cd /home/ubuntu/idea_cloud && git pull && sudo service suibun stop && sudo service suibun start")
  end
end

