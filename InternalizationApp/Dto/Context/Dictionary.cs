using System.ComponentModel.DataAnnotations.Schema;

public class Dictionary
{
    /// <summary>
    /// ML ID
    /// </summary>
    [Column("Id")]
    public int Id { get; set; }
    /// <summary>
    /// STRING CODE
    /// </summary>
    [Column("STRING_CODE")]
    public string STRING_CODE { get; set; }
    /// <summary>
    /// STRING VALUE
    /// </summary>
    [Column("STRING_VALUE")]
    public string STRING_VALUE { get; set; }
    /// <summary>
    /// LANG
    /// </summary>
    [Column("LANG")]
    public string LANG { get; set; }
    /// <summary>
    /// DATE
    /// </summary>
    [Column("CREATE_DATE")]
    public DateTime CREATE_DATE { get; set; }

}