namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateUserBooking : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserBookings", "ReservationName", c => c.String());
            AddColumn("dbo.UserBookings", "ReservationPhoneNumber", c => c.String());
            AddColumn("dbo.UserBookings", "UserEmail", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserBookings", "UserEmail");
            DropColumn("dbo.UserBookings", "ReservationPhoneNumber");
            DropColumn("dbo.UserBookings", "ReservationName");
        }
    }
}
