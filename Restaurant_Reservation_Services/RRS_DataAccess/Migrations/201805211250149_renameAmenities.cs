namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renameAmenities : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Restaurants", "OpeningHoursFrom", c => c.String());
            AddColumn("dbo.Restaurants", "OpeningHoursTo", c => c.String());
            AddColumn("dbo.Restaurants", "Amenities", c => c.String());
            DropColumn("dbo.Restaurants", "OpeningHours");
            DropColumn("dbo.Restaurants", "Amentities");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Restaurants", "Amentities", c => c.String());
            AddColumn("dbo.Restaurants", "OpeningHours", c => c.String());
            DropColumn("dbo.Restaurants", "Amenities");
            DropColumn("dbo.Restaurants", "OpeningHoursTo");
            DropColumn("dbo.Restaurants", "OpeningHoursFrom");
        }
    }
}
