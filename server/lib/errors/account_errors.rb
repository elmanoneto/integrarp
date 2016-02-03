module AccountErrors

  class OverdrawnError < StandardError
    def self.initialize(data)
      @data = data
    end
  end
  class CanNotTransferYourselfError < StandardError
    def self.initialize(data)
      @data = data
    end
  end

end
