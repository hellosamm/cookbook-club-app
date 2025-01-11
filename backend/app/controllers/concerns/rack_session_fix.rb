module RackSessionFix
  extend ActiveSupport::Concern
  
  class FakeRackSession < Hash
    def enabled?
      false
    end
  end
  
  included do
    before_action :set_fake_rack_session_for_devise
  end
    private

    def set_fake_rack_session_for_devise
      request.env['rack.session'] ||= FakeRackSession.new

      if request.method == "DELETE"
        request.env['rack.session'] ||= FakeRackSession.new
      end
    end
end