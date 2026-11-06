# frozen_string_literal: true

class AddPdpConsentToSessions < ActiveRecord::Migration[7.0]
  def change
    add_column :sessions, :consented_at, :datetime
    add_column :sessions, :consent_version, :string, limit: 50
    add_column :sessions, :consent_locale, :string, limit: 10, default: 'id'
    add_column :sessions, :data_retention_days, :integer, default: 30

    add_index :sessions, :consented_at
  end
end

