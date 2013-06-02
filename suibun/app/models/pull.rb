class Pull
  def self.pull_and_restart
    system("cd /home/ubuntu/idea_cloud && git pull && sudo suibun stop && sudo suibun start")
  end
end

