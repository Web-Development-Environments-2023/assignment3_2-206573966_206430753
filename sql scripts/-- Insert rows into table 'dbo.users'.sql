-- Insert rows into table 'dbo.users'
INSERT INTO dbo.users_tirgul
    ( -- columns to insert data into
    [username], [password]
    )
VALUES
    ( -- first row: values for the columns in the list above
        'testUser', HASHBYTES('SHA2_256', 'passUser')
)
-- add more rows here
GO