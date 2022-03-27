package net.yogstation.yogbot.util;

public class ReflectionUtil {
	
	// Turn a string into the integral type associated with the class
	// Used to set the fields properly
	// Taken from https://stackoverflow.com/a/13943623
	// In a java class because it ends up using almost all java classes anyway
	public static Object toObject(Class<?> clazz, String value) {
		if (Boolean.class == clazz || Boolean.TYPE == clazz) return Boolean.parseBoolean(value);
		if (Byte.class == clazz || Byte.TYPE == clazz) return Byte.parseByte(value);
		if (Short.class == clazz || Short.TYPE == clazz) return Short.parseShort(value);
		if (Integer.class == clazz || Integer.TYPE == clazz) return Integer.parseInt(value);
		if (Long.class == clazz || Long.TYPE == clazz) return Long.parseLong(value);
		if (Float.class == clazz || Float.TYPE == clazz) return Float.parseFloat(value);
		if (Double.class == clazz || Double.TYPE == clazz) return Double.parseDouble(value);
		return value;
	}
}
