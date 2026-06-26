public class JsonWrapper {

    public Section coffee;
    public Section brewing;

    public class Section {
        public List<Region> region;
        public Country country;
    }

    public class Region {
        public Integer id;
        public String name;
    }

    public class Country {
        public Integer id;
        public String company;
    }
}