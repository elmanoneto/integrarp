module AuthErrors

  class NotAuthenticatedErrortion < StandardError
    def self.initialize(data)
      @data = data
    end
  end
  class AuthenticationTimeoutError < StandardError
    def self.initialize(data)
      @data = data
    end
  end

end
