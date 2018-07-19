namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class makeDateTimeToString : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserBookings", "Date", c => c.String());
            AddColumn("dbo.UserBookings", "Time", c => c.String());
            AlterColumn("dbo.Users", "Birthday", c => c.String());
            DropColumn("dbo.UserBookings", "DateTime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserBookings", "DateTime", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Users", "Birthday", c => c.DateTime(nullable: false));
            DropColumn("dbo.UserBookings", "Time");
            DropColumn("dbo.UserBookings", "Date");
        }
    }
}
